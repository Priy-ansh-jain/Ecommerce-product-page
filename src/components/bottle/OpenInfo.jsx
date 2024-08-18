import { FaInfoCircle } from 'react-icons/fa';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader, DialogTrigger } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const OpenInfo = ({ openInfoModal, setOpenInfoModal, currencySymbols, currency }) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="hover:bg-gray-300 rounded-full p-2">
            <FaInfoCircle
              className="duration-300 transition-300 text-black hover:text-orange-600"
              onClick={() => setOpenInfoModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-transparent text-white">
            <p>Learn More</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openInfoModal} onOpenChange={setOpenInfoModal}>
        <DialogTrigger asChild>
          <span className="sr-only">Open Modal</span>
        </DialogTrigger>
        <DialogContent
          className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black bg-opacity-50"
          onOpenAutoFocus={(e) => e.preventDefault()} // Prevents background scroll
        >
          <div className="relative h-[600px] w-[600px] flex-col flex border-2 border-[#AC6AFF] bg-white p-6 rounded-lg overflow-y-auto">
            <DialogHeader className="grid grid-cols-2">
              <button
                onClick={() => setOpenInfoModal(false)}
                className="text-xl text-gray-700 justify-start flex hover:text-red-500"
              >
                X
              </button>
            </DialogHeader>
            <DialogTitle className="text-xl font-semibold">About The Product</DialogTitle>
            <DialogDescription className="mt-4">
              <div className="content_flightht_travel_dil">
                <h1> Pay 4 installments of {currencySymbols[currency]}24.75</h1>
                <div className="terms">
                  <p>
                    See payment <a href="">terms</a>. A higher initial payment
                    may be required for some consumers. CA resident loans made
                    or arranged pursuant to a California Financing Law
                    license.
                  </p>
                </div>
                <div>
                  <div className="outer">
                    <div className="progress">
                      <div className="right">
                        <div>Add item(s) to your cart</div>
                      </div>
                      <div className="right">
                        <div>Go to checkout and choose your product</div>
                      </div>
                      <div className="right">
                        <div>Enter your debit or credit card information</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="condition_text">
                  <p>
                    The first payment is taken when the order is processed and
                    the next 3 payments are automatically made every 2 weeks
                    after your Initial Payment (first Installment Payment due
                    at least 15 days after Initial Payment for California
                    residents).
                  </p>
                </div>
                <div className="here">
                  <p>
                    For more info about the conditions for Pay in 4, click{" "}
                    <br />
                    <a href="here">here</a>
                  </p>
                </div>
                <div className="close_popup">
                  <button
                    onClick={() => setOpenInfoModal(false)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  >
                    Close
                  </button>
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OpenInfo;
