export default function className(...args: any[]): string {
    return args.filter(Boolean).join(" ");
}
