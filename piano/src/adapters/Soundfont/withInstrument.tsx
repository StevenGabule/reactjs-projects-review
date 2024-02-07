import { InstrumentName } from 'soundfont-player';
import { MidiValue } from '../../domain/note';
import { Optional } from '../../domain/types';
import { Component, ComponentType } from 'react';

type InjectedProps = {
  loading: boolean;
  play(note: MidiValue): Promise<void>;
  stop(note: MidiValue): Promise<void>;
};
type ProviderProps = {
  AudioContext: AudioContextType;
  instrument: InstrumentName;
};
type ProviderState = {
  loading: boolean;
  current: Optional<InstrumentName>;
};

export function withInstrument<TProps extends InjectedProps = InjectedProps>(WrappedComponent: ComponentType<TProps>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  return class WithInstrument extends Component<ProviderProps, ProviderState> {
		
	};
}
