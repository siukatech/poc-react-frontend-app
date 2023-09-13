import * as Icons from '@mui/icons-material';

type IconNames = keyof typeof Icons;
type IconProps = {
  name: IconNames;
};


/**
 * References:
 * https://stackoverflow.com/a/75906013
 * 
 * @param param0 
 * @returns 
 */
const IconComponent: React.FC<IconProps> = ({ name }) => {
  const Icon = Icons[name];
  return (
    <>
      <Icon />
    </>
  );
};

export default IconComponent;

export type { IconNames, IconProps };

