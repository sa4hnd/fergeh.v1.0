import profaneWords from "@2toad/profanity/dist/data/profane-words";
import { List } from "@2toad/profanity/dist/models";
import { ProfanityOptions } from "@2toad/profanity/dist/profanity-options";
import { escapeRegExp } from "@2toad/profanity/dist/utils/misc";
import type { JSONContent } from "@tiptap/react";

import { getPlainText } from "@quenti/lib/editor";

import whitelist from "./static/profanity.json";

const { defaultWhitelist, usernameWhitelist } = whitelist;

class Profanity {
  options: ProfanityOptions;
  whitelist: List;
  private blacklist: List;
  private regex: RegExp | undefined;

  constructor(options?: ProfanityOptions) {
    this.options = options || new ProfanityOptions();
    this.whitelist = new List(() => this.buildRegex());
    this.blacklist = new List(() => this.buildRegex());
    this.blacklist.addWords(profaneWords);
  }

  exists(text: string): boolean {
    this.regex!.lastIndex = 0;
    return this.regex!.test(text);
  }

  /**
   * Modified version of the original censor implementation to ensure the same number of characters
   */
  censor(text: string): string {
    return text.replace(this.regex!, function ($2) {
      return "*".repeat($2.length);
    });
  }

  addWords(words: string[]): void {
    this.blacklist.addWords(words);
  }
  removeWords(words: string[]): void {
    this.blacklist.removeWords(words);
  }

  private buildRegex(): void {
    const escapedBlacklistWords = this.blacklist.words.map(escapeRegExp);
    const escapedWhitelistWords = this.whitelist.words.map(escapeRegExp);

    const blacklistPattern = `${
      this.options.wholeWord ? "\\b" : ""
    }(${escapedBlacklistWords.join("|")})${
      this.options.wholeWord ? "\\b" : ""
    }`;
    const whitelistPattern = this.whitelist.empty
      ? ""
      : `(?!${escapedWhitelistWords.join("|")})`;

    this.regex = new RegExp(whitelistPattern + blacklistPattern, "ig");
  }
}

const options = new ProfanityOptions();
const usernameOptions = new ProfanityOptions();
usernameOptions.wholeWord = false;

export const profanity = new Profanity(options);
profanity.removeWords(defaultWhitelist);

export const usernameProfanity = new Profanity(usernameOptions);
usernameProfanity.removeWords(
  // Since we're filtering based on part of the word, it's more important to remove 3-4 letter
  // words that could be part of normal words like "cumbersome"
  // Better to err on the side of allowing the name than to censor something normal and look ridiculous
  defaultWhitelist.concat(...usernameWhitelist),
);

export const censorRichText = (json: JSONContent): JSONContent => {
  const plainText = getPlainText(json);
  const censored = profanity.censor(plainText);
  return internalCensor(0, censored, json);
};

const internalCensor = (
  _index: number,
  censored: string,
  json: JSONContent,
): JSONContent => {
  let index = _index;

  return {
    ...json,
    content: json.content?.map((node) => {
      if (node.type === "text" && typeof node.text == "string") {
        const start = index;
        const end = index + node.text.length;
        index = end;

        return {
          ...node,
          text: censored.slice(start, end),
        };
      }
      if (node.type === "paragraph") {
        return internalCensor(index, censored, node);
      }

      return node;
    }),
  };
};
