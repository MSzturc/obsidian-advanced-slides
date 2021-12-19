import { ObsidianMarkdownPreprocessor } from "src/obsidianMarkdownPreprocessor";
import { prepare } from "./testUtils";
import { MockedObsidianUtils, obsidianUtils as utilsInstance} from "./__mocks__/mockObsidianUtils";


test('Extended Markdown Syntax > Horizontal / Vertical Slides', () => {

	const input =
`# Slide 1

---

# Slide 2.1

--

# Slide 2.2
`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

