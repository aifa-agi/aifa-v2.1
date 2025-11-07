// app/@right/layout.tsxS

import React from "react";

interface RightLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function RightLayout({
  children,
  modal,
}: RightLayoutProps) {

  return (
    <>
      {children}


      {modal}

    </>
  );
}
