// Header.jsx
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ back = true, title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="h-16 md:h-20 w-full flex items-center justify-between px-4 md:px-8 text-white">
      {back ? (
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          <ArrowBackIosNewRoundedIcon fontSize="medium" />
        </button>
      ) : (
        <div className="w-8" /> // Dummy div to balance layout
      )}
      <h1 className="text-[18px] md:text-[22px] font-bold">{title}</h1>
      <div className="w-8" /> {/* To balance the back button space */}
    </div>
  );
};

export default Header;
