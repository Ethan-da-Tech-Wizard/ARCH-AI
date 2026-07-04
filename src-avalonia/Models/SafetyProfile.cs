using System.Collections.Generic;

namespace src_avalonia.Models
{
    public class SafetyProfile
    {
        public string GuideDevice { get; set; } = string.Empty;
        public string MachineType { get; set; } = string.Empty;
        public string CurrentEnvironment { get; set; } = string.Empty;
        public string InstallTarget { get; set; } = string.Empty;
        public string EraseIntent { get; set; } = string.Empty;
        public string InternalDriveCount { get; set; } = string.Empty;
        public string ExternalDrive { get; set; } = string.Empty;
        public string BootMode { get; set; } = string.Empty;
        public string BootloaderPath { get; set; } = string.Empty;
        public string NetworkPath { get; set; } = string.Empty;
        public string SwapStrategy { get; set; } = string.Empty;
        public string AudioTarget { get; set; } = string.Empty;

        public bool IsComplete()
        {
            return !string.IsNullOrEmpty(GuideDevice) &&
                   !string.IsNullOrEmpty(MachineType) &&
                   !string.IsNullOrEmpty(CurrentEnvironment) &&
                   !string.IsNullOrEmpty(InstallTarget) &&
                   !string.IsNullOrEmpty(EraseIntent) &&
                   !string.IsNullOrEmpty(InternalDriveCount) &&
                   !string.IsNullOrEmpty(ExternalDrive) &&
                   !string.IsNullOrEmpty(BootMode) &&
                   !string.IsNullOrEmpty(BootloaderPath) &&
                   !string.IsNullOrEmpty(NetworkPath) &&
                   !string.IsNullOrEmpty(SwapStrategy) &&
                   !string.IsNullOrEmpty(AudioTarget);
        }
    }

    public class DeviceMapItem
    {
        public string Value { get; set; } = string.Empty;
        public bool Unknown { get; set; } = false;
    }
}
