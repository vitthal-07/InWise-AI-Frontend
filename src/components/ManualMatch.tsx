import { Link, Search, X } from "lucide-react";
import { useState } from "react";
import { Invoice } from "../types";

interface ManualMatchProps {
  isOpen: boolean;
  onClose: () => void;
  unmatchedInvoices: Invoice[];
  onMatch: (invoice1: Invoice, invoice2: Invoice) => void;
}

export function ManualMatch({
  isOpen,
  onClose,
  unmatchedInvoices,
  onMatch,
}: ManualMatchProps) {
  const [selectedInvoice1, setSelectedInvoice1] = useState<Invoice | null>(
    null
  );
  const [selectedInvoice2, setSelectedInvoice2] = useState<Invoice | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = unmatchedInvoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vendor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMatch = () => {
    if (selectedInvoice1 && selectedInvoice2) {
      onMatch(selectedInvoice1, selectedInvoice2);
      setSelectedInvoice1(null);
      setSelectedInvoice2(null);
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
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Invoice 1
                    </h4>
                    <div className="space-y-2">
                      {filteredInvoices.map((invoice) => (
                        <button
                          key={invoice.id}
                          onClick={() => setSelectedInvoice1(invoice)}
                          className={`w-full p-3 text-left rounded-lg border ${
                            selectedInvoice1?.id === invoice.id
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
                              : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <div className="font-medium text-gray-900 dark:text-white">
                            {invoice.id}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {invoice.vendor} - ${invoice.amount}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Invoice 2
                    </h4>
                    <div className="space-y-2">
                      {filteredInvoices
                        .filter(
                          (invoice) => invoice.id !== selectedInvoice1?.id
                        )
                        .map((invoice) => (
                          <button
                            key={invoice.id}
                            onClick={() => setSelectedInvoice2(invoice)}
                            className={`w-full p-3 text-left rounded-lg border ${
                              selectedInvoice2?.id === invoice.id
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
                                : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                          >
                            <div className="font-medium text-gray-900 dark:text-white">
                              {invoice.id}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {invoice.vendor} - ${invoice.amount}
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
              disabled={!selectedInvoice1 || !selectedInvoice2}
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
