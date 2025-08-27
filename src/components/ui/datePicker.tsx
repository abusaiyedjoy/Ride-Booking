import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { format } from "date-fns"

export default function DatePickerField({ label }: { label?: string }) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("12:00:00")

  return (
    <div className="flex flex-col flex-1">
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative mt-2">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              readOnly
              value={
                date
                  ? `${format(date, "PPP")} ${time}`
                  : ""
              }
              placeholder="Select date & time"
              className="pl-10 cursor-pointer"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
          <div className="border-t p-3 flex items-center gap-3">
            <Label htmlFor="time" className="text-xs">
              Enter time
            </Label>
            <div className="relative grow">
              <Input
                id="time"
                type="time"
                step="1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <ClockIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
