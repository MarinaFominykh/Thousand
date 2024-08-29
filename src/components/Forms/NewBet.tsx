import { FC, FormEvent } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useStyles } from "@hooks/useStyles";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { useFormValue } from "@hooks/useFormValue";
import { setBet } from "@store/reducers/gameSlice";
import styles from "./styles.module.scss";
import sharedStyles from "../../styles/shared.module.scss";
import { IPlayer } from "@src/types/IPlayer";

interface Props {
  onClose: () => void;
}
export const NewBet: FC<Props> = ({ onClose }) => {
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);
  const dispatch = useAppDispatch();
  const { values, handleChange, handleSelectChange, resetForm } =
    useFormValue();
  const { players } = useAppSelector((state) => state.playerSlice);

  const addBet = (event: FormEvent) => {
    event.preventDefault();
    const bet = {
      playerId: values?.playerId || "",
      bet: Number(values?.bet || ""),
    };
    dispatch(setBet(bet));
    resetForm();
    onClose();
  };

  return (
    <form className={cx("form")} onSubmit={addBet}>
      <fieldset className={cxShared("fieldset")}>
        <FormControl>
          <InputLabel>Device</InputLabel>
          <Select
            name="playerId"
            label="device"
            value={values?.playerId || ""}
            onChange={handleSelectChange}
            required
          >
            {players.map((player: IPlayer) => (
              <MenuItem key={player.id} value={player.id}>
                {player.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="bet"
          label="Bet"
          slotProps={{
            htmlInput: { type: "number", min: "100", step: "5" },
          }}
          value={values?.bet || ""}
          onChange={handleChange}
          required
        />
      </fieldset>
      <div className={cxShared("buttons")}>
        <Button onClick={onClose}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
};
