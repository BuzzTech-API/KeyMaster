import { useState } from "react";
import Modal from "./modal";
import Consentimento from "../types/consentimento";
import Checkbox from "./checkbox";

type Props = {
  consentimentos: Consentimento[];
  setConsentimentos: React.Dispatch<React.SetStateAction<Consentimento[]>>;
};

interface ConsentimentoCreate {
  content: string;
  isOptional: boolean;
}
export const ModalCreateConsent: React.FC<Props> = ({
  consentimentos,
  setConsentimentos,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [consentData, setConsentData] = useState<ConsentimentoCreate>({
    content: "",
    isOptional: false,
  });
  function onClose() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
        onClick={() => setIsOpen(true)}
      >
        Adicionar novo consentimento
      </button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={"Cadastrar Consentimento"}
        className="w-56"
        buttonNode={
          <div className="flex flex-row gap-10">
            <button
              className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
              onClick={() => {
                const newConsent = new Consentimento();
                newConsent.content = consentData.content;
                newConsent.isOptional = consentData.isOptional;
                setConsentimentos(consentimentos.concat(newConsent));
                setConsentData({
                  content: "",
                  isOptional: false,
                });
                onClose();
              }}
            >
              Cadastrar consentimento
            </button>
            <button
              onClick={onClose}
              className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Fechar
            </button>
          </div>
        }
      >
        {/* Name Input */}
        <div>
          <label htmlFor="text" className="block text-sm text-gray-300">
            Texto do Consentimento
          </label>
          <input
            id="text"
            type="text"
            className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={consentData.content}
            onChange={(e) =>
              setConsentData({
                ...consentData,
                content: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <Checkbox
            className="mt-4 mb-4"
            checked={consentData.isOptional}
            onChange={function(checked: boolean): void {
              setConsentData({
                ...consentData,
                isOptional: checked,
              });
            }}
            children={consentData.isOptional ? "Opcional" : "Obrigatório"}
          />
        </div>
      </Modal>
    </>
  );
};
