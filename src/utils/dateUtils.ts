export class DateUtils {
  static normalizeToUTC(dateString: string): string {
    if (!dateString) throw new Error("Invalid date string");

    if (dateString.includes("T") && dateString.endsWith("Z")) {
      return dateString;
    }

    const gmtDate = new Date(dateString.replace(" ", "T") + "Z");
    return gmtDate.toISOString();
  }
}
