import { DocLayout } from "@/modules/documentation/components/DocLayout"

export default function AppDocLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocLayout>{children}</DocLayout>
}
