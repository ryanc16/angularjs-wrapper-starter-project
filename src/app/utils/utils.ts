export class Utils {

  static camelCase(input: string): string {
    let split = input.split('');
    split[0] = split[0].toLowerCase();
    return split.join('');
  }

  static kababCase(input: string): string {
    let split = input.split('');
    let out = '';
    for(let char of split) {
      if(char === char.toUpperCase()) {
        out += '-';
      }
      char = char.toLowerCase();
      out += char;
    }
    return out;
  }

  static kababCaseToCamelCase(input: string): string {
    return input.replace(/-(\w)/ig, ($0,$1) => $1.toUpperCase());
  }
}