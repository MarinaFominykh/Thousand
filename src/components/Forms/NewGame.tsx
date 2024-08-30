import { FormEvent, FC } from "react";
import { TextField, Button } from "@mui/material";
import { useStyles } from "@hooks/useStyles";
import { useAppDispatch } from "@hooks/redux";
import { useFormValue } from "@hooks/useFormValue";
import { setPlayers } from "@store/reducers/playerSlice";
import { resetGame } from "@store/reducers/gameSlice";
import styles from "./styles.module.scss";
import sharedStyles from "../../styles/shared.module.scss";

const dataFields = [
  {
    id: 1,
    name: "0",
    label: "Игрок 1",
  },
  {
    id: 2,
    name: "1",
    label: "Игрок 2",
  },
  { id: 3, name: "2", label: "Игрок 3" },
];

interface Props {
  onClose: () => void;
}

export const NewGame: FC<Props> = ({ onClose }) => {
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);
  const dispatch = useAppDispatch();
  const { values, handleChange } = useFormValue();

  const startGame = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const arr = Array(3).fill({});
    const players = arr.map((_, i) => {
      return {
        id: String(i),
        name: values?.[String(i)] || "",
        score: 0,
        // active: false,
        // rounds: [0],
        bolt: 0,
      };
    });
    dispatch(setPlayers(players));
    dispatch(resetGame());
    onClose();
  };

  return (
    <form className={cx("form")} onSubmit={startGame}>
      <fieldset className={cxShared("fieldset")}>
        {dataFields.map((field) => (
          <TextField
            key={field.id}
            name={field.name}
            label={field.label}
            value={values?.[field.name] || ""}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            slotProps={{
              htmlInput: { maxLength: "10" },
            }}
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
