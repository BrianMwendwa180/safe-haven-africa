# TODO: Fix useAuth Error in Index.tsx After Registration

## Information Gathered
- The app uses AuthProvider from `client/src/lib/auth.tsx`, which provides useAuth.
- Index.tsx incorrectly imports useAuth from `client/src/contexts/AuthContext.tsx`, causing the error "useAuth must be used within an AuthProvider".
- After registration, the user is navigated to "/", which is the Index page.
- The logout function in lib/auth.tsx is named "signout".

## Plan
- Update `client/src/pages/Index.tsx` to import useAuth from "@/lib/auth" instead of "@/contexts/AuthContext".
- Change the logout call to signout to match the function name in lib/auth.tsx.

## Dependent Files to be Edited
- `client/src/pages/Index.tsx`

## Followup Steps
- [x] Updated Index.tsx to use correct useAuth import and signout function.
- [x] Verified that the error is resolved and registration redirects properly to the home page.
