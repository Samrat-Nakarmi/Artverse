'use client'
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

function UseAuth() {
  const auth = localStorage.getItem("私は猫が大好き");
  const router = useRouter();
  useEffect(() => {
    if (!auth) {
      
      swal({
        title: "Bro, login first stoopid hecker",
        icon: "warning",
      });
      router.push('/')
    }
  }, [auth]);
}

export default UseAuth;