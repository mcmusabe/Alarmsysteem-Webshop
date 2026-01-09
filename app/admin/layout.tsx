import AdminLayout from '@/components/Admin/AdminLayout'
import { ToastProvider } from '@/components/ui/ToastContainer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminLayout>{children}</AdminLayout>
    </ToastProvider>
  )
}
