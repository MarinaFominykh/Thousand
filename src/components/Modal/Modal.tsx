import { FC, FormEvent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
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
  //handleSubmit: (event: FormEvent) => void;
}

export const Modal: FC<Props> = (props) => {
  const {
    open,
    handleClose,
    //handleSubmit
  } = props;
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
    <Dialog
      open={open}
      onClose={handleClose}
      className={cx("modal")}
      //   PaperProps={{
      //     component: "form",
      //     onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
      //       event.preventDefault();
      //       handleSubmit(event);
      //       handleClose();
      //     },
      //   }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={cx("content")}>
        {variantModalRender()}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
      </DialogActions> */}
    </Dialog>
  );
};
