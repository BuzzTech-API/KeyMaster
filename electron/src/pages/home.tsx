import { useTerms } from "../context/TermsContext";
import React from "react";
import AcceptNewTerms from "./AcceptNewTerms";
import { TermOfConditions } from "../types/termOfConditions";


const Home: React.FC = () => {
  const {allConsentsValid, hasUnacceptedMandatory, termOfConditions }= useTerms()

   if((!allConsentsValid || hasUnacceptedMandatory)&& termOfConditions !== null){
    return(
    <AcceptNewTerms termOfConditions={termOfConditions ? termOfConditions : new TermOfConditions()} />
    )

  }else{
  return(
    <div className=" ml-56 flex-grow p-8 bg-blue-600 h-full ">
      <h1 className="text-3xl font-bold">Welcome to Your Password Manager</h1>
      <p className="mt-4">Easily manage and store your passwords securely.</p>
    </div>
  );
  }
}
export default Home
