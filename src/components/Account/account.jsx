import styles from "./account.module.css"
import Image from "next/image";
const Account =()=>{
    return <div>
        <div>
            <h3 className={styles.heading2}>My Profile</h3>
        </div>
        <div className={styles.container}>    
            <div className={styles.imgcontainer}>
                <Image src="/user.jpg" alt="" fill className={styles.img} />
            </div>

            <div className={styles.formcontainer}>
                <form action="" className={styles.form}> 
                    <label className={styles.labels}>Name</label>
                    <input type="text" placeholder="Name"/>
                    <label className={styles.labels}>UserName</label>
                    <input type="text" placeholder="UserName"/>
                    <label className={styles.labels}>Phone Number 01</label>
                    <input type="text" placeholder="Phone Number"/>
                    <label className={styles.labels}>Country</label>
                    <input type="text" placeholder="Country"/>
                
                </form>
            </div>

            <div className={styles.formcontainer_2}>
                <form action="" className={styles.form}>
                    <label className={styles.labels}>Surname</label> 
                    <input type="text" placeholder="Surname"/>
                    <label className={styles.labels}>Email</label>
                    <input type="text" placeholder="Email Address"/>
                    <label className={styles.labels}>Phone Number 02</label>
                    <input type="text" placeholder="Phone Number"/>
                    <label className={styles.labels}>Zip Code</label>
                    <input type="text" placeholder="Zip Code"/>
                    
                </form>
            </div>
        </div>

        <div>
            <br/>
        </div>

        <div>
            <h3 className={styles.heading3}>Billing Address</h3>
        </div>

        <div className={styles.container}>
            
            <div className={styles.container_1}>

            </div>
   
            <div className={styles.container_2}> 
                    <form action="" className={styles.form}>
                        <label className={styles.labels}>Address No</label> 
                        <input type="text" placeholder="Address No"/>
                        <label className={styles.labels}>Address Line 1</label>
                        <input type="text" placeholder="Address Line 1"/>
                        <label className={styles.labels}>Address Town</label>
                        <input type="text" placeholder="Address Town"/>
                        <label className={styles.labels}>Address Ditrict</label>
                        <input type="text" placeholder="Address District"/>
                        

                        
                    </form>
            </div>

            <div className={styles.container_3}>
                    
                    <form action="" className={styles.form}>
                    <label className={styles.labels}>Address Street</label>
                    <input type="text" placeholder="Address Street"/>
                    <label className={styles.labels}>Address Line 2</label>
                    <input type="text" placeholder="Address Line 2"/>
                    <label className={styles.labels}>Address City</label>
                    <input type="text" placeholder="Address City"/>
                    <label className={styles.labels}>Address Province</label>
                    <input type="text" placeholder="Address Province"/>
                        
                    </form>
            </div>



        </div>

    </div>
}
export default Account;
