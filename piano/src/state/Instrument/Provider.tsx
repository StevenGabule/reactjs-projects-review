import { FunctionComponent, ReactNode, useState } from 'react';
import { DEFAULT_INSTRUMENT } from '../../domain/sound';
import { InstrumentContext } from './Context';

type Props = {
	children: ReactNode
}

// ! keeps the instrument value in a local state and exposes 
// ! the setInstrument() method to update it
export const InstrumentContextProvider = ({ children }: Props) => {
  const [instrument, setInstrument] = useState(DEFAULT_INSTRUMENT);
  return <InstrumentContext.Provider value={{ instrument, setInstrument }}>{children}</InstrumentContext.Provider>;
};
