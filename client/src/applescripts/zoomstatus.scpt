set meetingStatus to false
set muteStatus to false
set videoStatus to false
set shareStatus to false
tell application "System Events"
	if exists (window 1 of process "zoom.us") then
		set meetingStatus to false
		tell application process "zoom.us"
			if exists (menu bar item "Meeting" of menu bar 1) then
				set meetingStatus to true
				if exists (menu item "Mute audio" of menu 1 of menu bar item "Meeting" of menu bar 1) then
					set muteStatus to false
				else
					set muteStatus to true
				end if
				if exists (menu item "Start video" of menu 1 of menu bar item "Meeting" of menu bar 1) then
					set videoStatus to false
				else
					set videoStatus to true
				end if
				if exists (menu item "Start share" of menu 1 of menu bar item "Meeting" of menu bar 1) then
					set shareStatus to false
				else
					set shareStatus to true
				end if
			end if
		end tell
	end if
end tell

return {meetingStatus, muteStatus, videoStatus}