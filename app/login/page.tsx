// "use client";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// import type { Database } from "@/utils/database.types";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const supabase = createClientComponentClient<Database>();

//   const handleSignUp = async () => {
//     await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo: `${location.origin}/auth/callback`,
//       },
//     });
//     router.refresh();
//   };

//   const handleSignIn = async () => {
//     await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     router.refresh();
//   };

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     router.refresh();
//   };

//   return (
//     <>
//       <input
//         name="email"
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//       />
//       <input
//         type="password"
//         name="password"
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//       />
//       <button onClick={handleSignUp}>Sign up</button>
//       <button onClick={handleSignIn}>Sign in</button>
//       <button onClick={handleSignOut}>Sign out</button>
//     </>
//   );
// }

//  post call to /api/login
import styles from "./page.module.css";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/utils/database.types";
export default function Login() {
  return (
    <>
      <div className={styles.wrap}>
        <form action="/api/auth/login" method="post">
          <label htmlFor="email">Email</label>
          <input name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <button>Sign In</button>
          <button formAction="/api/auth/sign-up">Sign Up</button>
          <button formAction="/api/auth/logout">Log Out</button>
        </form>
      </div>
    </>
  );
}
