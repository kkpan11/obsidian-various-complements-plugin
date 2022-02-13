export type WordType =
  | "currentFile"
  | "currentVault"
  | "customDictionary"
  | "internalLink"
  | "tag";

export interface DefaultWord {
  value: string;
  description?: string;
  aliases?: string[];
  type: WordType;
  createdPath: string;
  // Add after judge
  offset?: number;
}
export interface CurrentFileWord extends DefaultWord {
  type: "currentFile";
}
export interface CurrentVaultWord extends DefaultWord {
  type: "currentVault";
}
export interface CustomDictionaryWord extends DefaultWord {
  type: "customDictionary";
}
export interface InternalLinkWord extends DefaultWord {
  type: "internalLink";
  phantom?: boolean;
  aliasMeta?: {
    origin: string;
  };
}
export interface TagWord extends DefaultWord {
  type: "tag";
}

export type Word =
  | CurrentFileWord
  | CurrentVaultWord
  | CustomDictionaryWord
  | InternalLinkWord
  | TagWord;

export class WordTypeMeta {
  private static readonly _values: WordTypeMeta[] = [];
  private static readonly _dict: { [type: string]: WordTypeMeta } = {};

  static readonly TAG = new WordTypeMeta("tag", 100, "tag");
  static readonly INTERNAL_LINK = new WordTypeMeta(
    "internalLink",
    90,
    "internalLink"
  );
  static readonly CUSTOM_DICTIONARY = new WordTypeMeta(
    "customDictionary",
    80,
    "suggestion"
  );
  static readonly CURRENT_FILE = new WordTypeMeta(
    "currentFile",
    70,
    "suggestion"
  );
  static readonly CURRENT_VAULT = new WordTypeMeta(
    "currentVault",
    60,
    "suggestion"
  );

  private constructor(
    readonly type: WordType,
    readonly priority: number,
    readonly group: string
  ) {
    WordTypeMeta._values.push(this);
    WordTypeMeta._dict[type] = this;
  }

  static of(type: WordType): WordTypeMeta {
    return WordTypeMeta._dict[type];
  }

  static values(): WordTypeMeta[] {
    return WordTypeMeta._values;
  }
}