-- property startShareScreen: "Start share screen"
-- property stopShare: "Stop share screen"
-- property newShare: "New share"

if application "zoom.us" is running then
    tell application "System Events"
        tell application process "zoom.us"
            tell window "zoom.us"
                keystroke "S" using {command down, shift down}
            end tell
        end tell
    end tell
end if
