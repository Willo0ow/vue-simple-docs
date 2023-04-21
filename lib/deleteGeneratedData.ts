import config from "../docs.config";
import path from "path";

import { deleteDirectoryContents } from "./deleteDirectoryContents";
deleteDirectoryContents(path.join(config.outputDir, 'src', 'generated'));
