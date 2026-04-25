"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

function getFormValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function redirectWithMessage(path: string, status: "error" | "success", message: string) {
  const params = new URLSearchParams({
    status,
    message,
  });

  redirect(`${path}?${params.toString()}`);
}

export async function login(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirectWithMessage(
      "/login",
      "error",
      "Add your Supabase environment variables before logging in."
    );
  }

  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");

  if (!email || !password) {
    redirectWithMessage("/login", "error", "Enter both email and password.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirectWithMessage("/login", "error", error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirectWithMessage(
      "/login",
      "error",
      "Add your Supabase environment variables before creating the owner account."
    );
  }

  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");

  if (!email || !password) {
    redirectWithMessage("/login", "error", "Enter both email and password.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirectWithMessage("/login", "error", error.message);
  }

  revalidatePath("/", "layout");
  redirectWithMessage(
    "/login",
    "success",
    "Check your inbox to confirm the owner account, then sign in."
  );
}
