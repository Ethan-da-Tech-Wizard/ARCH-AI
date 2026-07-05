package model

// DeviceMapItem holds a user-supplied device/partition name and whether
// the user has indicated they do not yet know the real value.
type DeviceMapItem struct {
	// Value is the actual device path the user typed, e.g. "/dev/sda".
	Value string `json:"value"`

	// Unknown is true when the user clicked "I don't know yet".
	// Commands that reference this device will be rendered as incomplete
	// and the copy button will be disabled.
	Unknown bool `json:"unknown"`
}

// DeviceMap is the full collection of named device placeholders for the wizard.
type DeviceMap map[string]DeviceMapItem

// Well-known device map keys used throughout the wizard.
const (
	DevKeyDisk      = "disk"       // e.g. /dev/sda, /dev/nvme0n1
	DevKeyEFIPart   = "efi_part"   // e.g. /dev/sda1, /dev/nvme0n1p1
	DevKeyRootPart  = "root_part"  // e.g. /dev/sda2, /dev/nvme0n1p2
	DevKeySwapPart  = "swap_part"  // e.g. /dev/sda3 (optional)
	DevKeyHomePart  = "home_part"  // e.g. /dev/sda4 (optional)
	DevKeyWifiDev   = "wifi_dev"   // e.g. wlan0
	DevKeyWifiSSID  = "wifi_ssid"  // e.g. MyNetwork
	DevKeyHostname  = "hostname"   // e.g. archbox
	DevKeyUsername  = "username"   // e.g. ethan
	DevKeyTimezone  = "timezone"   // e.g. America/Phoenix
	DevKeyLocale    = "locale"     // e.g. en_US.UTF-8
	DevKeyRootUUID  = "root_uuid"  // filled after blkid
)

// DefaultDeviceMap returns a DeviceMap with all well-known keys initialised
// to unknown so the wizard knows which inputs to request.
func DefaultDeviceMap() DeviceMap {
	keys := []string{
		DevKeyDisk, DevKeyEFIPart, DevKeyRootPart,
		DevKeySwapPart, DevKeyHomePart,
		DevKeyWifiDev, DevKeyWifiSSID,
		DevKeyHostname, DevKeyUsername,
		DevKeyTimezone, DevKeyLocale, DevKeyRootUUID,
	}
	m := make(DeviceMap, len(keys))
	for _, k := range keys {
		m[k] = DeviceMapItem{Unknown: true}
	}
	return m
}

// Get returns the stored value for key, or the placeholder string if unknown.
func (dm DeviceMap) Get(key string) string {
	if item, ok := dm[key]; ok && !item.Unknown && item.Value != "" {
		return item.Value
	}
	return "{{" + key + "}}"
}

// IsKnown returns true when the device map entry has a real value.
func (dm DeviceMap) IsKnown(key string) bool {
	item, ok := dm[key]
	return ok && !item.Unknown && item.Value != ""
}

// Set updates a device map entry with a known value.
func (dm DeviceMap) Set(key, value string) {
	dm[key] = DeviceMapItem{Value: value, Unknown: false}
}

// SetUnknown marks a device map entry as unknown.
func (dm DeviceMap) SetUnknown(key string) {
	dm[key] = DeviceMapItem{Unknown: true}
}
