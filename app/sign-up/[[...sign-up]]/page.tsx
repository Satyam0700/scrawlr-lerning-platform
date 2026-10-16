import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<div className="h-96 w-80 rounded-xl bg-neutral-100 animate-pulse" />}>
        <SignUp />
      </Suspense>
    </div>
  );
}
