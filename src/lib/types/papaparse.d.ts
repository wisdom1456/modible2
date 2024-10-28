declare module 'papaparse' {
  export function parse<T>(input: string, config?: ParserConfig): ParseResult<T>;

  export interface ParserConfig {
    header?: boolean;
    dynamicTyping?: boolean;
    skipEmptyLines?: boolean;
    transformHeader?: (header: string) => string;
    // Add other PapaParse configuration options as needed
  }

  export interface ParseResult<T> {
    data: T[];
    errors: ParseError[];
    meta: ParseMeta;
  }

  export interface ParseError {
    type: string;
    code: string;
    message: string;
    row: number;
  }

  export interface ParseMeta {
    delimiter: string | null;
    linebreak: string | null;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
  }
}
