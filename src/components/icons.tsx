import { icons, type LucideIcon as LucideIconType } from 'lucide-react-native';

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  color?: string;
  size?: number;
};
function Icon({ name, color, size }: IconProps) {
  // eslint-disable-next-line import/namespace
  const LucideIcon = icons[name] as LucideIconType;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <LucideIcon color={color} size={size} />;
}

export default Icon;
