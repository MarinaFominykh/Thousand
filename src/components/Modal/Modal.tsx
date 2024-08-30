import { FC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppSelector } from "@hooks/redux";
import { EVariantModal } from "@src/types/EVariantModal";
import { NewGame } from "@components/Forms/NewGame";
import { NewBet } from "@components/Forms/NewBet";
import { NewResult } from "@components/Forms/NewResult";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const Modal: FC<Props> = (props) => {
  const { open, handleClose } = props;
  const cx = useStyles(styles);
  const { variant, title } = useAppSelector((state) => state.modalSlice);
  const variantModalRender = () => {
    if (variant === EVariantModal.newGame) {
      return <NewGame onClose={handleClose} />;
    } else if (variant === EVariantModal.addBet) {
      return <NewBet onClose={handleClose} />;
    } else if (variant === EVariantModal.addResult) {
      return <NewResult onClose={handleClose} />;
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} className={cx("modal")}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={cx("content")}>
        {variantModalRender()}
      </DialogContent>
    </Dialog>
  );
};
