import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Proyecto from "./proyecto";
import Aplicacion from "./aplicacion";
import Pago from "./pago";
import Comentario from "./comentario";

@Entity({
    name: "usuarios"
})
export default class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    contrasenia: string;

    @Column({
        type: "enum",
        enum: ["junior", "empresa", "admin"],
        default: "junior"
    })
    tipo: string;
    
    @Column({name: "update_at", default: new Date})
    updatedAt: Date;

    @Column({ name: "2fa_enabled", default: false })
    autenticacion2FAHabilitada: boolean;

    @Column({ name: "2fa_secret", nullable: true })
    autenticacion2FASecreto: string;

    @OneToMany(() => Proyecto, (projecto) => projecto.empresaId)
    projecto: Proyecto[];

    @OneToMany(() => Aplicacion, (aplicacion) => aplicacion.juniorId)
    aplicacion: Aplicacion[];

    @OneToMany(() => Pago, (pagos) => pagos.empresaId)
    PagoRealizado: Pago[];

    @OneToMany(() => Pago, (pagos) => pagos.juniorId)
    ComentarioRecivido: Pago[];

    @OneToMany(() => Comentario, (comentarios) => comentarios.usuarioId)
    comentarios: Comentario[];

}
