import { FileUtils } from './FileUtils';

xdescribe('FileUtils', () => {
  describe('isEmpty', () => {
    it('should be a base64 string', () => {
      expect(
        FileUtils.walk('packages/yggdrasilts/nestjs', {
          filter: 'package.json',
        })
      ).toBe('VEVTVA==');
    });
  });
});
