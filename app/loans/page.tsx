import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function LoansPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Agricultural <span className="text-primary">Loans</span>
            </h1>
            <p className="text-lg text-center text-foreground/80 mb-8">
              Access affordable financing options tailored for farmers to support your agricultural activities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-background border border-primary/20 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Loan Features</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><span className="font-semibold">Lower interest rates</span> - Starting from 4% per annum</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><span className="font-semibold">Flexible repayment options</span> - Aligned with harvest cycles</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><span className="font-semibold">Quick disbursement</span> - Funds within 7 working days</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><span className="font-semibold">Minimal documentation</span> - Simplified application process</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><span className="font-semibold">No collateral</span> - For loans up to ₹1 lakh</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background border border-primary/20 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Loan Types</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Crop Loans</h3>
                    <p className="text-sm text-foreground/80">For seasonal agricultural operations, seed purchase, fertilizers, and labor.</p>
                    <p className="text-sm font-medium text-primary mt-1">Up to ₹3 lakhs</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Equipment Loans</h3>
                    <p className="text-sm text-foreground/80">For purchasing tractors, harvesters, and other agricultural machinery.</p>
                    <p className="text-sm font-medium text-primary mt-1">Up to ₹10 lakhs</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Land Development Loans</h3>
                    <p className="text-sm text-foreground/80">For land leveling, soil conservation, and irrigation infrastructure.</p>
                    <p className="text-sm font-medium text-primary mt-1">Up to ₹5 lakhs</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Storage Infrastructure</h3>
                    <p className="text-sm text-foreground/80">For building warehouses, cold storage, and other post-harvest facilities.</p>
                    <p className="text-sm font-medium text-primary mt-1">Up to ₹8 lakhs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background border border-primary/20 rounded-xl p-6 md:p-8 shadow-sm mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Loan Application Form</h2>
              <form className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows={3}
                      className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your complete address"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="aadhar" className="block text-sm font-medium text-foreground mb-1">
                        Aadhar Number
                      </label>
                      <input
                        type="text"
                        id="aadhar"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="XXXX-XXXX-XXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="pan" className="block text-sm font-medium text-foreground mb-1">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        id="pan"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="landRecords" className="block text-sm font-medium text-foreground mb-1">
                        Land Holding (in acres)
                      </label>
                      <input
                        type="number"
                        id="landRecords"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., 5"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Loan Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="loanType" className="block text-sm font-medium text-foreground mb-1">
                        Loan Type
                      </label>
                      <select
                        id="loanType"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select loan type</option>
                        <option value="crop">Crop Loan</option>
                        <option value="equipment">Equipment Loan</option>
                        <option value="land">Land Development Loan</option>
                        <option value="storage">Storage Infrastructure Loan</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="loanAmount" className="block text-sm font-medium text-foreground mb-1">
                        Loan Amount (in ₹)
                      </label>
                      <input
                        type="number"
                        id="loanAmount"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., 100000"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-foreground mb-1">
                      Purpose of Loan
                    </label>
                    <textarea
                      id="purpose"
                      rows={3}
                      className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Describe how you plan to use the loan"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="tenure" className="block text-sm font-medium text-foreground mb-1">
                        Repayment Period (in months)
                      </label>
                      <select
                        id="tenure"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select tenure</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                        <option value="24">24 months</option>
                        <option value="36">36 months</option>
                        <option value="48">48 months</option>
                        <option value="60">60 months</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="income" className="block text-sm font-medium text-foreground mb-1">
                        Annual Agricultural Income (in ₹)
                      </label>
                      <input
                        type="number"
                        id="income"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., 200000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Banking Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bankName" className="block text-sm font-medium text-foreground mb-1">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        id="bankName"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your bank name"
                      />
                    </div>
                    <div>
                      <label htmlFor="accountNumber" className="block text-sm font-medium text-foreground mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        id="accountNumber"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your account number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ifsc" className="block text-sm font-medium text-foreground mb-1">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        id="ifsc"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter IFSC code"
                      />
                    </div>
                    <div>
                      <label htmlFor="branch" className="block text-sm font-medium text-foreground mb-1">
                        Branch Name
                      </label>
                      <input
                        type="text"
                        id="branch"
                        className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter branch name"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-medium py-3 px-4 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Submit Loan Application
                  </button>
                  <p className="text-xs text-center text-foreground/60 mt-2">
                    Your application will be reviewed within 3-5 business days. We may contact you for additional information.
                  </p>
                </div>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="border border-foreground/10 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">What documents do I need to apply?</h3>
                  <p className="text-foreground/80">
                    You'll need proof of identity (Aadhar/PAN), land ownership documents, bank statements for the last 6 months, and income proof like farm receipts or previous tax returns.
                  </p>
                </div>
                <div className="border border-foreground/10 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">How long does the approval process take?</h3>
                  <p className="text-foreground/80">
                    Typically 3-5 business days for initial approval, with funds disbursed within 7 days of final approval.
                  </p>
                </div>
                <div className="border border-foreground/10 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Can I apply if I have an existing loan?</h3>
                  <p className="text-foreground/80">
                    Yes, but approval will depend on your repayment history and current debt-to-income ratio. We review each case individually.
                  </p>
                </div>
                <div className="border border-foreground/10 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Are there any prepayment penalties?</h3>
                  <p className="text-foreground/80">
                    No, we encourage early repayment and do not charge any prepayment penalties on agricultural loans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 