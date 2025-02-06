import { Link, Search, X } from "lucide-react";
import { useState } from "react";
import { MatchData } from "../types";

interface ManualMatchProps {
  isOpen: boolean;
  onClose: () => void;
  unmatchedInvoices: MatchData[];
  onMatch: (invoice_1: string, invoice_2: string) => void;
}

export function ManualMatch({
  isOpen,
  onClose,
  unmatchedInvoices,
  onMatch,
}: ManualMatchProps) {
  const [selectedinvoice_1, setSelectedinvoice_1] = useState<string | null>(
    null
  );
  const [selectedinvoice_2, setSelectedinvoice_2] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and remove duplicates from invoice_1
  const invoice1List = Array.from(
    new Set(
      unmatchedInvoices
        .map((invoice) => invoice.invoice_1)
        .filter((inv) => inv !== "")
    )
  );

  // Filter and remove duplicates from invoice_2 (excluding selected invoice_1)
  const invoice2List = Array.from(
    new Set(
      unmatchedInvoices
        .map((invoice) => invoice.invoice_2)
        .filter((inv) => inv !== "" && inv !== selectedinvoice_1)
    )
  );

  const handleMatch = () => {
    if (selectedinvoice_1 && selectedinvoice_2) {
      onMatch(selectedinvoice_1, selectedinvoice_2);
      setSelectedinvoice_1(null);
      setSelectedinvoice_2(null);
      setSearchTerm("");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Manual Invoice Matching
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Invoice 1 Selection */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Invoice 1
                    </h4>
                    <div className="space-y-2">
                      {invoice1List.map((invoice) => (
                        <button
                          key={invoice}
                          onClick={() => setSelectedinvoice_1(invoice)}
                          className={`w-full p-3 text-left rounded-lg border ${
                            selectedinvoice_1 === invoice
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
                              : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <div className="font-medium text-gray-900 dark:text-white">
                            {invoice}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Invoice 2 Selection */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Invoice 2
                    </h4>
                    <div className="space-y-2">
                      {invoice2List.map((invoice) => (
                        <button
                          key={invoice}
                          onClick={() => setSelectedinvoice_2(invoice)}
                          className={`w-full p-3 text-left rounded-lg border ${
                            selectedinvoice_2 === invoice
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
                              : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <div className="font-medium text-gray-900 dark:text-white">
                            {invoice}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleMatch}
              disabled={!selectedinvoice_1 || !selectedinvoice_2}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Link className="w-4 h-4 mr-2" />
              Match Invoices
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
