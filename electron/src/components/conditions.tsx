import Condition from "../types/condition";
import Checkbox from "./checkbox";
import { useState } from "react";

export default function Conditions(condition: Condition) {
  const [checked, setChecked] = useState(condition.checked)
  return (
    <Checkbox checked={checked} onChange={function(checkedd): void {
      condition.checked = checkedd
      setChecked(checkedd)
    }} >
      {condition.consentimento.text}
    </Checkbox>
  )
}
