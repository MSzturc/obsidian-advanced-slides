import { ObsidianUtils } from 'src/obsidianUtils';
import { anyString, anything, instance, mock, when } from 'ts-mockito';

export const MockedObsidianUtils = mock(ObsidianUtils);

when(MockedObsidianUtils.getAbsolutePath(anyString())).thenCall(arg => {
	throw new Error('Parameter not mocked: ' + arg);
});

when(MockedObsidianUtils.findFile(anyString())).thenCall(arg => {
	throw new Error('Parameter not mocked: ' + arg);
});

when(MockedObsidianUtils.findImageEx(anyString())).thenCall(arg => {
	throw new Error('Parameter not mocked: ' + arg);
});

when(MockedObsidianUtils.parseFile(anyString(), anything())).thenCall((arg1, arg2) => {
	throw new Error('Parameter not mocked: ' + arg1 + ' - ' + arg2);
});

when(MockedObsidianUtils.getVaultName()).thenReturn('test-vault');

when(MockedObsidianUtils.findFile('template')).thenReturn('templateMock');

when(MockedObsidianUtils.absolute('templateMock')).thenReturn('template');

when(MockedObsidianUtils.parseFile('template', anything())).thenCall(arg => {
	throw new Error('Parameter not mocked: ' + arg);
});

export const obsidianUtils: ObsidianUtils = instance(MockedObsidianUtils);
