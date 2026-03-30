import { AuthLayout } from '@/components/authentication/auth-layout';
import { VerifyCode } from '@/components/authentication/verify-code';

export default function VerifyCodePage() {
  return (
    <AuthLayout 
      imageSrc="/images/auth/verification_side.png" 
      darkImageSrc="/images/auth/verification_side_dark.png"
      imageAlt="Verify your identity"
      title="Verify Your Identity"
      subtitle="Confirm your ownership with the 6-digit cryptographic code sent to your email."
    >
      <VerifyCode />
    </AuthLayout>
  );
}
