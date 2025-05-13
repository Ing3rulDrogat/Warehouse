// annyang.d.ts
declare module "annyang" {
  interface Commands {
    [command: string]: (...args: any[]) => void;
  }

  interface Annyang {
    addCommands: (commands: Commands) => void;
    start: (options?: any) => void;
    abort: () => void;
    isListening: () => boolean;
    removeCommands: (command?: string | string[]) => void;
    setLanguage: (lang: string) => void;
    debug: (enabled: boolean) => void;
  }

  const annyang: Annyang | undefined;
  export default annyang;
}
