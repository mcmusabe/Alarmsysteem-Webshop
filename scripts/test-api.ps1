# PowerShell script om API endpoints te testen
# Run met: .\scripts\test-api.ps1

$BASE_URL = if ($env:BASE_URL) { $env:BASE_URL } else { "http://localhost:3000" }

Write-Host "Testing API Endpoints..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Base URL: $BASE_URL" -ForegroundColor Yellow
Write-Host ""

$results = @()

function Test-Endpoint {
    param(
        [string]$Endpoint,
        [string]$Method = "GET",
        [object]$Body = $null
    )
    
    try {
        $uri = "$BASE_URL$Endpoint"
        $headers = @{
            "Content-Type" = "application/json"
        }
        
        $params = @{
            Uri = $uri
            Method = $Method
            Headers = $headers
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-RestMethod @params -ErrorAction Stop
        
        return @{
            Endpoint = $Endpoint
            Method = $Method
            Success = $true
            Data = $response.data
            Error = $null
        }
    }
    catch {
        $errorMessage = $_.Exception.Message
        try {
            $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
            $errorMessage = $errorResponse.error
        }
        catch {
            # Keep original error message
        }
        
        return @{
            Endpoint = $Endpoint
            Method = $Method
            Success = $false
            Data = $null
            Error = $errorMessage
        }
    }
}

# Test 1: GET /api/prices
Write-Host "1. Testing GET /api/prices..." -ForegroundColor White
$result1 = Test-Endpoint -Endpoint "/api/prices" -Method "GET"
$results += $result1
if ($result1.Success) {
    Write-Host "   ✅ Success" -ForegroundColor Green
    Write-Host "   Data: $($result1.Data | ConvertTo-Json -Compress)"
} else {
    Write-Host "   ❌ Failed" -ForegroundColor Red
    Write-Host "   Error: $($result1.Error)" -ForegroundColor Red
}
Write-Host ""

# Test 2: POST /api/calculate-price
Write-Host "2. Testing POST /api/calculate-price..." -ForegroundColor White
$calculateBody = @{
    type = "woning"
    aantalDeuren = 2
    aantalRuimtes = 7
    kleur = "wit"
}
$result2 = Test-Endpoint -Endpoint "/api/calculate-price" -Method "POST" -Body $calculateBody
$results += $result2
if ($result2.Success) {
    Write-Host "   ✅ Success" -ForegroundColor Green
    Write-Host "   Totaal prijs: €$($result2.Data.totaalPrijs)" -ForegroundColor Green
} else {
    Write-Host "   ❌ Failed" -ForegroundColor Red
    Write-Host "   Error: $($result2.Error)" -ForegroundColor Red
}
Write-Host ""

# Test 3: POST /api/customers
Write-Host "3. Testing POST /api/customers..." -ForegroundColor White
$customerBody = @{
    naam = "Test Klant"
    email = "test-$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
    telefoon = "0612345678"
}
$result3 = Test-Endpoint -Endpoint "/api/customers" -Method "POST" -Body $customerBody
$results += $result3
if ($result3.Success) {
    Write-Host "   ✅ Success" -ForegroundColor Green
    Write-Host "   Customer ID: $($result3.Data.id)" -ForegroundColor Green
} else {
    Write-Host "   ❌ Failed" -ForegroundColor Red
    Write-Host "   Error: $($result3.Error)" -ForegroundColor Red
}
Write-Host ""

# Test 4: GET /api/appointments/available
Write-Host "4. Testing GET /api/appointments/available..." -ForegroundColor White
$tomorrow = (Get-Date).AddDays(1).ToString("yyyy-MM-dd")
$result4 = Test-Endpoint -Endpoint "/api/appointments/available?datum=$tomorrow" -Method "GET"
$results += $result4
if ($result4.Success) {
    Write-Host "   ✅ Success" -ForegroundColor Green
    $times = $result4.Data.beschikbareTijden -join ", "
    Write-Host "   Beschikbare tijden: $times" -ForegroundColor Green
} else {
    Write-Host "   ❌ Failed" -ForegroundColor Red
    Write-Host "   Error: $($result4.Error)" -ForegroundColor Red
}
Write-Host ""

# Test 5: POST /api/appointments (if customer was created)
if ($result3.Success -and $result3.Data.id) {
    Write-Host "5. Testing POST /api/appointments..." -ForegroundColor White
    $appointmentBody = @{
        customerId = $result3.Data.id
        datum = $tomorrow
        tijd = "10:00"
        type = "installatie"
        opmerkingen = "Test afspraak"
    }
    $result5 = Test-Endpoint -Endpoint "/api/appointments" -Method "POST" -Body $appointmentBody
    $results += $result5
    if ($result5.Success) {
        Write-Host "   ✅ Success" -ForegroundColor Green
        Write-Host "   Appointment ID: $($result5.Data.id)" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Failed" -ForegroundColor Red
        Write-Host "   Error: $($result5.Error)" -ForegroundColor Red
    }
    Write-Host ""
}

# Test 6: POST /api/orders (if customer and calculate were successful)
if ($result3.Success -and $result2.Success) {
    Write-Host "6. Testing POST /api/orders..." -ForegroundColor White
    $orderBody = @{
        configuratie = @{
            type = "woning"
            aantalDeuren = 2
            aantalRuimtes = 7
            kleur = "wit"
        }
        customer = @{
            naam = "Test Klant"
            email = $customerBody.email
            telefoon = "0612345678"
            adres = "Teststraat 123"
            postcode = "1234AB"
            stad = "Amsterdam"
        }
        type = "kopen"
    }
    $result6 = Test-Endpoint -Endpoint "/api/orders" -Method "POST" -Body $orderBody
    $results += $result6
    if ($result6.Success) {
        Write-Host "   ✅ Success" -ForegroundColor Green
        Write-Host "   Ordernummer: $($result6.Data.ordernummer)" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Failed" -ForegroundColor Red
        Write-Host "   Error: $($result6.Error)" -ForegroundColor Red
    }
    Write-Host ""
}

# Summary
Write-Host ("=" * 50) -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host ("=" * 50) -ForegroundColor Cyan
$passed = ($results | Where-Object { $_.Success }).Count
$failed = ($results | Where-Object { -not $_.Success }).Count
Write-Host "Total tests: $($results.Count)" -ForegroundColor White
Write-Host "✅ Passed: $passed" -ForegroundColor Green
Write-Host "❌ Failed: $failed" -ForegroundColor Red
Write-Host ""

if ($failed -gt 0) {
    Write-Host "Failed tests:" -ForegroundColor Red
    $results | Where-Object { -not $_.Success } | ForEach-Object {
        Write-Host "  - $($_.Method) $($_.Endpoint): $($_.Error)" -ForegroundColor Red
    }
    exit 1
} else {
    Write-Host "All tests passed!" -ForegroundColor Green
    exit 0
}
