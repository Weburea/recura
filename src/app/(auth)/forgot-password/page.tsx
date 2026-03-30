import { AuthLayout } from '@/components/authentication/auth-layout';
import { ForgotPassword } from '@/components/authentication/forgot-password';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout 
      imageSrc="/images/auth/recovery_side.png" 
      darkImageSrc="/images/auth/recovery_side_dark.png"
      imageAlt="Recover your Recura account"
      title="Recovering Your Account"
      subtitle="Follow the high-security steps to securely regain access to your workspace."
    >
      <ForgotPassword />
    </AuthLayout>
  );
}
