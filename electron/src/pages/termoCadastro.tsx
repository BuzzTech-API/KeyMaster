import Consentimento from "../types/consentimento";
import Checkbox from "../components/checkbox";
import { useState } from "react";
import { ModalCreateConsent } from "../components/ModalCreateConsent";
import CreateTermOfConditions from "../api/term-of-conditions";
import CreateConsent from "../api/consent";
import { useTerms } from "../context/TermsContext";
import { logout } from "../api/logout";

type props = {
  setActiveScreen: React.Dispatch<React.SetStateAction<string>>; // Callback prop
};
export default function CadastroTermo({ setActiveScreen }: props) {
  const [pdfLink, setPdfLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [consentimentos, setConsentimentos] = useState<Array<Consentimento>>(
    [],
  );
  const { revalidateTerms } = useTerms()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // NOTE: Fazer função de fetch para criar o termo principal
    const fetchTerm = await CreateTermOfConditions({ pdfLink });
    if (fetchTerm.status === 201) {
      const responseTerm = await fetchTerm.json();
      const fetchConsents = await Promise.all(
        consentimentos.map((consentimento) => {
          return CreateConsent({
            content: consentimento.content,
            isOptional: consentimento.isOptional,
            termOfCondition_id: responseTerm.id,
          });
        }),
      );
      await revalidateTerms()
      await logout()
      
      setActiveScreen("login")
      
    }

    // NOTE: Configurar a criação dos checkbox para o usuário
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-full w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Cadastrar Termo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-300">
              Link do Pdf
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={pdfLink}
              onChange={(e) => setPdfLink(e.target.value)}
              required
            />

            <iframe
              className="w-full px-4 py-2 mt-2 "
              src={pdfLink}
              height={300}
            ></iframe>
          </div>

          {/* Email Input */}
          <div>
            {consentimentos.map((consent, index) => {
              return (
                <Checkbox
                  key={index}
                  checked={false}
                  className="flex items-center justify-center"
                  onChange={function(check): void { }}
                >
                  <span>
                    {consent.content}{" "}
                    {consent.isOptional ? (
                      <></>
                    ) : (
                      <span className="text-red-700">*</span>
                    )}
                    <button
                      onClick={() =>
                        setConsentimentos(
                          consentimentos.filter(
                            (consentimento) => consentimento !== consent,
                          ),
                        )
                      }
                      className="mt-4 w-40 py-2 ml-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
                    >
                      Remover
                    </button>
                  </span>
                </Checkbox>
              );
            })}
          </div>

          <ModalCreateConsent
            consentimentos={consentimentos}
            setConsentimentos={setConsentimentos}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Cadastrar
          </button>
        </form>
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
