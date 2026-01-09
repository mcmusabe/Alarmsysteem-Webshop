'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/ToastContainer'
import Spinner from '@/components/ui/Spinner'
import Skeleton from '@/components/ui/Skeleton'

interface Product {
  id: string
  naam: string
  key: string
  prijs: number
  beschrijving?: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editPrice, setEditPrice] = useState<string>('')
  const [savingId, setSavingId] = useState<string | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      const data = await response.json()
      if (data.success) {
        setProducts(data.data)
      } else {
        showToast(data.error || 'Fout bij laden van producten', 'error')
      }
    } catch (error) {
      console.error('Fout bij ophalen products:', error)
      showToast('Fout bij laden van producten', 'error')
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (product: Product) => {
    setEditingId(product.id)
    setEditPrice(product.prijs.toString())
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditPrice('')
  }

  const saveProduct = async (productId: string) => {
    const price = parseFloat(editPrice)
    if (isNaN(price) || price < 0) {
      showToast('Ongeldige prijs ingevoerd', 'error')
      return
    }

    setSavingId(productId)
    try {
      const response = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId, prijs: price }),
      })
      const data = await response.json()
      if (data.success) {
        showToast('Productprijs bijgewerkt', 'success')
        fetchProducts()
        cancelEdit()
      } else {
        showToast(data.error || 'Fout bij updaten product', 'error')
      }
    } catch (error) {
      console.error('Fout bij updaten product:', error)
      showToast('Fout bij updaten product', 'error')
    } finally {
      setSavingId(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(price)
  }

  if (loading) {
    return (
      <div>
        <Skeleton width={300} height={40} className="mb-8" />
        <Card>
          <Skeleton lines={6} />
        </Card>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-medium text-black mb-8">Producten & Prijzen</h1>

      <Card>
        {products.length === 0 ? (
          <p className="text-gray-600 py-8 text-center">Geen producten gevonden</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Key</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Prijs</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Acties</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                      {product.naam}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{product.key}</td>
                    <td className="py-3 px-4">
                      {editingId === product.id ? (
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  saveProduct(product.id)
                                } else if (e.key === 'Escape') {
                                  cancelEdit()
                                }
                              }}
                              className="border border-gray-300 rounded-lg pl-6 pr-2 py-1 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                              autoFocus
                            />
                          </div>
                          {savingId === product.id ? (
                            <Spinner size="sm" />
                          ) : (
                            <>
                              <Button
                                variant="accent"
                                size="sm"
                                onClick={() => saveProduct(product.id)}
                              >
                                Opslaan
                              </Button>
                              <Button variant="ghost" size="sm" onClick={cancelEdit}>
                                Annuleren
                              </Button>
                            </>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 font-medium">
                          {formatPrice(product.prijs)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingId !== product.id && (
                        <Button variant="outline" size="sm" onClick={() => startEdit(product)}>
                          Bewerken
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
