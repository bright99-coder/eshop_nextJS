import { useCompare } from "@/context/CompareContext";
import Image from "next/image";
import ReactModal from "react-modal";
import CardProduct from "./CardProduct";

const CompareModal = () => {
  const { compareItems, openModal, setOpenModal } = useCompare();
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <ReactModal
      isOpen={openModal}
      onRequestClose={handleClose}
      className="max-w-6xl mx-auto bg-white overflow-hidden shadow-lg outline-none transition-all"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20"
      ariaHideApp={false}
    >
      <div className="flex">
        {compareItems?.map((item) => (
          <CompareItemModal key={item.id} item={item} />
        ))}
      </div>
    </ReactModal>
  );
};

export default CompareModal;
interface Props {
  item: Product;
}
const CompareItemModal = ({ item }: Props) => {
  return (
    <div className="flex flex-col p-4 compare-items-modal z-10">
      <div className="h-64 overflow-hidden flex justify-center items-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.image}`}
          width={400}
          height={150}
          alt=""
        />
      </div>
      <h2 className="text-blue-500 text-xl my-3">{item.product_name}</h2>
      <h3 className="text-red-500 font-bold">{item.selling_price}$</h3>
      <h4 className="my-3 font-bold text-gray-600">Brand: {item.brand_name}</h4>
      <p className="text-sm">{item.description}</p>
    </div>
  );
};
