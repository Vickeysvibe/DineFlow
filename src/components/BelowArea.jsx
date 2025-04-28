import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Link } from "react-router-dom";

const BelowArea = ({ items }) => {
  return (
    <Link
      to={"/cart"}
      className="bg-accent w-full rounded-t-4xl h-20 p-3 flex justify-between items-center absolute bottom-0 left-0  drop-shadow-2xl drop-shadow-black"
    >
      <LocalMallOutlinedIcon fontSize="large" className="m-[0_10px]" />
      <span className="flex gap-1.5">
        <h1 className="text-md">{items} Items</h1>
        <h6 className="text-xs mt-[8px]">on cart</h6>
      </span>
      <ArrowForwardIosRoundedIcon fontSize="large" className="m-[0_10px]" />
    </Link>
  );
};
export default BelowArea;
