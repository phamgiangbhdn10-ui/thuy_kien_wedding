/**
 * Mapping từ local path sang Cloudinary filename
 * Vì tất cả ảnh được upload ở root trên Cloudinary
 */

export const cloudinaryImageMap: Record<string, string> = {
    // 15x21 images
    '/images/15x21/DSC00869.jpg': 'DSC00869_tjw7t0.jpg',
    '/images/15x21/DSC01111.jpg': 'DSC01111_iqtmnu.jpg',
    '/images/15x21/DSC01337.jpg': 'DSC01337_mjafm1.jpg',
    '/images/15x21/DSC01342.jpg': 'DSC01342_rxlbh6.jpg',
    '/images/15x21/DSC01468.jpg': 'DSC01468_ucngaz.jpg',
    '/images/15x21/DSC01513.jpg': 'DSC01513_c4xjmj.jpg',
    '/images/15x21/DSC01639.jpg': 'DSC01639_g8x09z.jpg',
    '/images/15x21/DSC01660.jpg': 'DSC01660_mhy7ca.jpg',
    '/images/15x21/DSC01710.jpg': 'DSC01710_vvomig.jpg',
    '/images/15x21/DSC01739.jpg': 'DSC01739_uceree.jpg',
  
    // Invitation images (60x120)
    '/images/60x120/c1.jpg': 'c1_rwbilm.jpg',
    '/images/60x120/c2.jpg': 'c2_bshyxz.jpg',
  
    // Avatar images
    '/images/avatar/cd.jpg': 'cd_l4evau.jpg',
    '/images/avatar/cr.jpg': 'cr_voh3y8.jpg',
  
    // Other images
    '/images/1200x630.jpg': '1200x630_yrsf9n.jpg',
  
    // LeHoi images
    '/lehoi/i_1.JPG': 'i_1_vqa755.jpg',
    '/lehoi/i_2.JPG': 'i_2_fjlomg.jpg',
    '/lehoi/i_3.JPG': 'i_3_ncx2nc.jpg',
    '/lehoi/i_4.JPG': 'i_4_qzkelb.jpg',
    '/lehoi/i_5.JPG': 'i_5_w1lwqb.jpg',
    '/lehoi/i_6.JPG': 'i_6_aj1ibi.jpg',
    '/lehoi/i_7.JPG': 'i_7_dmck7w.jpg',
    '/lehoi/i_8.JPG': 'i_8_ed71iz.jpg',
    '/lehoi/i_9.JPG': 'i_9_zsto4o.jpg',
  }
  

/**
 * Get Cloudinary filename from local path
 */
export function getCloudinaryFilename(localPath: string): string {
  return cloudinaryImageMap[localPath] || localPath.split('/').pop() || localPath
}

