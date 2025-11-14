"use client";
import SwitchUI from "@/components/atoms/switchUI";
import LoginForm from "@/components/organism/loginForm";
import { useState } from "react";

export default function Login() {
  // So im kinda stupid i have a padding of large on main component on my layout. so Ive calculated it to make it in a way to remove
  // that padding my minusing it. Welcome to computer science 1 O 1 with your boy alin.

  const [selectedValue, setSelectedValue] = useState<boolean>(false);
  return (
    <div style={{ margin: `calc(-1 * var(--space-lg))` }}>
      <SwitchUI selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <LoginForm />
    </div>
  );
}
