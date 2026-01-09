/**
 * Test script voor alle API endpoints
 * Run met: npx tsx scripts/test-api.ts
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

interface TestResult {
  endpoint: string
  method: string
  status: number
  success: boolean
  error?: string
  data?: any
}

async function testEndpoint(
  endpoint: string,
  method: string = 'GET',
  body?: any
): Promise<TestResult> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options)
    const data = await response.json()

    return {
      endpoint,
      method,
      status: response.status,
      success: response.ok && data.success !== false,
      data: data.success ? data.data : undefined,
      error: data.error || (!response.ok ? `HTTP ${response.status}` : undefined),
    }
  } catch (error) {
    return {
      endpoint,
      method,
      status: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

async function runTests() {
  console.log('🧪 Testing API Endpoints...\n')
  console.log(`Base URL: ${BASE_URL}\n`)

  const results: TestResult[] = []

  // Test 1: GET /api/prices
  console.log('1. Testing GET /api/prices...')
  const pricesResult = await testEndpoint('/api/prices', 'GET')
  results.push(pricesResult)
  if (pricesResult.success) {
    console.log('   ✅ Success')
    console.log(`   Data:`, JSON.stringify(pricesResult.data, null, 2))
  } else {
    console.log('   ❌ Failed')
    console.log(`   Error: ${pricesResult.error}`)
  }
  console.log()

  // Test 2: POST /api/calculate-price
  console.log('2. Testing POST /api/calculate-price...')
  const calculateResult = await testEndpoint('/api/calculate-price', 'POST', {
    type: 'woning',
    aantalDeuren: 2,
    aantalRuimtes: 7,
    kleur: 'wit',
  })
  results.push(calculateResult)
  if (calculateResult.success) {
    console.log('   ✅ Success')
    console.log(`   Totaal prijs: €${calculateResult.data?.totaalPrijs}`)
  } else {
    console.log('   ❌ Failed')
    console.log(`   Error: ${calculateResult.error}`)
  }
  console.log()

  // Test 3: POST /api/customers
  console.log('3. Testing POST /api/customers...')
  const customerResult = await testEndpoint('/api/customers', 'POST', {
    naam: 'Test Klant',
    email: `test-${Date.now()}@example.com`,
    telefoon: '0612345678',
  })
  results.push(customerResult)
  if (customerResult.success) {
    console.log('   ✅ Success')
    console.log(`   Customer ID: ${customerResult.data?.id}`)
  } else {
    console.log('   ❌ Failed')
    console.log(`   Error: ${customerResult.error}`)
  }
  console.log()

  // Test 4: GET /api/appointments/available
  console.log('4. Testing GET /api/appointments/available...')
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dateStr = tomorrow.toISOString().split('T')[0]
  const availableResult = await testEndpoint(
    `/api/appointments/available?datum=${dateStr}`,
    'GET'
  )
  results.push(availableResult)
  if (availableResult.success) {
    console.log('   ✅ Success')
    console.log(`   Beschikbare tijden: ${availableResult.data?.beschikbareTijden?.join(', ')}`)
  } else {
    console.log('   ❌ Failed')
    console.log(`   Error: ${availableResult.error}`)
  }
  console.log()

  // Test 5: POST /api/appointments (requires customerId)
  if (customerResult.success && customerResult.data?.id) {
    console.log('5. Testing POST /api/appointments...')
    const appointmentResult = await testEndpoint('/api/appointments', 'POST', {
      customerId: customerResult.data.id,
      datum: dateStr,
      tijd: '10:00',
      type: 'installatie',
      opmerkingen: 'Test afspraak',
    })
    results.push(appointmentResult)
    if (appointmentResult.success) {
      console.log('   ✅ Success')
      console.log(`   Appointment ID: ${appointmentResult.data?.id}`)
    } else {
      console.log('   ❌ Failed')
      console.log(`   Error: ${appointmentResult.error}`)
    }
    console.log()
  }

  // Test 6: POST /api/orders (requires customer)
  if (customerResult.success && customerResult.data?.id && calculateResult.success) {
    console.log('6. Testing POST /api/orders...')
    const orderResult = await testEndpoint('/api/orders', 'POST', {
      configuratie: {
        type: 'woning',
        aantalDeuren: 2,
        aantalRuimtes: 7,
        kleur: 'wit',
      },
      customer: {
        naam: 'Test Klant',
        email: customerResult.data.email || 'test@example.com',
        telefoon: '0612345678',
        adres: 'Teststraat 123',
        postcode: '1234AB',
        stad: 'Amsterdam',
      },
      type: 'kopen',
    })
    results.push(orderResult)
    if (orderResult.success) {
      console.log('   ✅ Success')
      console.log(`   Ordernummer: ${orderResult.data?.ordernummer}`)
    } else {
      console.log('   ❌ Failed')
      console.log(`   Error: ${orderResult.error}`)
    }
    console.log()
  }

  // Summary
  console.log('='.repeat(50))
  console.log('📊 Test Summary')
  console.log('='.repeat(50))
  const passed = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  console.log(`Total tests: ${results.length}`)
  console.log(`✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log()

  if (failed > 0) {
    console.log('Failed tests:')
    results
      .filter(r => !r.success)
      .forEach(r => {
        console.log(`  - ${r.method} ${r.endpoint}: ${r.error}`)
      })
    process.exit(1)
  } else {
    console.log('🎉 All tests passed!')
    process.exit(0)
  }
}

runTests().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
