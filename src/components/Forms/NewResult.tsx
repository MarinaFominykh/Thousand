import { FormEvent, useState, FC } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Switch,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import {
  resetBet,
  setBet,
  setDealer,
  setGame,
} from "@store/reducers/gameSlice";
import { FormValues, useFormValue } from "@hooks/useFormValue";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import sharedStyles from "../../styles/shared.module.scss";
import { IPlayer } from "@src/types/IPlayer";

type TResult = {
  [key: string]: string | number;
};
interface Props {
  onClose: () => void;
}

export const NewResult: FC<Props> = ({ onClose }) => {
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);
  const dispatch = useAppDispatch();
  const { values, resetForm, handleChange } = useFormValue();
  const { players } = useAppSelector((state) => state.playerSlice);
  const {
    bet: { playerId, bet },
    game,
    game: { roundResult },
    dealer,
  } = useAppSelector((state) => state.gameSlice);
  const [checked, setChecked] = useState(false);
  const name = players?.find((player: IPlayer) => player.id === playerId)?.name;
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  function convertValuesToNumbers(obj: TResult) {
    for (let key in obj) {
      obj[key] = Number(obj[key]);
    }
    return obj;
  }

  const addResult = (event: FormEvent) => {
    event.preventDefault();
    if (values) {
      const numberValues = convertValuesToNumbers(values);
      const round: TResult = {
        ...numberValues,
        [playerId]: checked ? bet : -bet,
      };
      const lastResult = roundResult[roundResult.length - 1];
      const result: TResult = {};
      for (const key in lastResult) {
        if (lastResult.hasOwnProperty(key)) {
          result[key] = lastResult[key] + (round[key] || 0);
        }
      }

      dispatch(setGame({ ...game, roundResult: [...roundResult, result] }));
      dispatch(setBet({ playerId: String(dealer + 2), bet: 100 }));
      dispatch(setDealer(dealer + 1));
    }
  };
  console.log("bet", bet);
  return (
    <form className={cx("form")} onSubmit={addResult}>
      <fieldset className={cxShared("fieldset")}>
        <FormControl>
          <FormLabel sx={{ fontSize: "16px", color: "black" }}>
            Ставка {name}: {bet}
          </FormLabel>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontSize: "12px" }}>Взял</Typography>
            <Switch checked={checked} name="deleted" onChange={handleChecked} />
            <Typography sx={{ fontSize: "12px" }}>Не взял</Typography>
          </Stack>
        </FormControl>
        {players
          .filter((player: IPlayer) => player.id !== playerId)
          .map((player: IPlayer) => (
            <TextField
              key={player.id}
              name={player.id}
              label={player.name}
              value={values?.[player.id] || ""}
              onChange={handleChange}
              placeholder="add result"
              slotProps={{
                htmlInput: { type: "number", min: "5", step: "5" },
              }}
              required
            />
          ))}
      </fieldset>
      <div className={cxShared("buttons")}>
        <Button onClick={onClose}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
};
