import { AuthLayout } from '@/components/authentication/auth-layout';
import { ResetPassword } from '@/components/authentication/reset-password';

export default function ResetPasswordPage() {
  return (
    <AuthLayout 
      imageSrc="/images/auth/recovery_side.png" 
      darkImageSrc="/images/auth/recovery_side_dark.png"
      imageAlt="Reset your password"
      title="Set New Password"
      subtitle="Create a strong, unique password to complete the recovery process."
    >
      <ResetPassword />
    </AuthLayout>
  );
}
