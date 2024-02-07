import { Playground } from '../Playground';
import { NoAudioMessage } from '../NoAudioMessage';
import { useAudioContext } from '../AudioContextProvider';

export const Main = () => {
  const AudioContext = useAudioContext();
	// ! checks whether the browser supports Audio API or not
  return !!AudioContext ? <Playground /> : <NoAudioMessage />;
};
